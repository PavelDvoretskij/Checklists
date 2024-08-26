import ApiErrors from "../exceptions/api-errors.js";
import tokenService from "../service/token-service.js";

export default function (req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;
    const accessToken = authorizationHeader.split(" ")[1];
    const userData = tokenService.validAccessToken(accessToken);

    userData.then((data) => {
      if (!data) {
        return next(new ApiErrors(`Пользователь не авторизован`, 401));
      }
      req.user = userData;
      next();
    });
  } catch (error) {
    return next(new ApiErrors(`Пользователь не авторизован`, 401));
  }
}
