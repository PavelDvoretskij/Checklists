import jwt from "jsonwebtoken";
import TokenModal from "../models/token.js";

class TokenService {
  generateTokens(data) {
    const accessToken = jwt.sign(data, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "15d",
    });
    const refreshToken = jwt.sign(data, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken(data, refreshToken) {
    const tokenData = await TokenModal.findOne({ user: data.id });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const newTokenModal = new TokenModal({
      user: data.id,
      refreshToken,
    });

    await newTokenModal.save();
  }

  async removeToken(refreshToken) {
    const tokenData = await TokenModal.deleteOne({ refreshToken });
    return tokenData;
  }

  async validAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch (error) {
      return null;
    }
  }

  async validRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch (error) {
      return null;
    }
  }

  async findToken(refreshToken) {
    try {
      const tokenData = await TokenModal.findOne({ refreshToken });
      return tokenData;
    } catch (error) {
      return null;
    }
  }
}

export default new TokenService();
