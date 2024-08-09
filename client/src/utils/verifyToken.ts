import { jwtDecode, JwtPayload } from "jwt-decode"


export const verifyToken = (token: string) => {
    return jwtDecode<JwtPayload>(token);
}