import UserModel from "../models/user.js";
import bcrypt from "bcryptjs";
import tokenService from "./token-service.js";
import UserDto from "../dtos/user-dto.js";
import ApiErrors from "../exceptions/api-errors.js";
import req from "express/lib/request.js";

class UserService {
  async registration(name, email, password) {
    const isUsed = await UserModel.findOne({ email });
    if (isUsed) {
      throw new ApiErrors(`Пользователь с почтой ${email} уже существует`, 401);
    }

    const salt = await bcrypt.genSaltSync(7);
    const hash = await bcrypt.hashSync(password, salt);

    const user = await UserModel.create({ name, email, password: hash });

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
      message: "Регистрация прошла успешно. Авторизуйтесь",
    };
  }

  async login(email, password) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new ApiErrors(`Пользователь с почтой ${email} не найден`, 401);
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw new ApiErrors(`Неверный пароль`, 401);
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw new ApiErrors(`Пользователь не авторизован`, 500);
    }
    const userData = await tokenService.validRefreshToken(refreshToken);

    if (!userData) {
      throw new ApiErrors(`Пользователь не авторизован`, 500);
    }

    const user = await UserModel.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    req.userId = userDto.id.toString();

    await tokenService.saveToken(userDto, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async getUsers() {
    const users = await UserModel.find();
    return users;
  }
}

export default new UserService();
