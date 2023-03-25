export default interface IGoogleAuthService {
  validateToken(token: String): Promise<Boolean>;
}
