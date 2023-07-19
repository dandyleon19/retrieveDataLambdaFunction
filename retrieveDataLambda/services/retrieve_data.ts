import { APIGatewayProxyEvent } from 'aws-lambda';
import { verify, JwtPayload } from 'jsonwebtoken';

export const retrieveData = async (event: APIGatewayProxyEvent): Promise<any> => {
    /**
     * Token Header exists
     */
    const tokenHeader = event.headers.token;

    if (!tokenHeader) throw 'Missing Token';

    /**
     *  Token Header Validation
     */
    const validToken = validateToken(tokenHeader);

    if (!validToken) throw 'Invalid Token';

    const body = JSON.parse(event.body ?? '');

    /**
     *  Fields Validation
     */
    const { token } = body;

    if (!token) throw 'Missing Fields';

    /**
     *  Retrieve data from token
     */
    const data = getDataByToken(body.token);

    delete data.cvv;

    return data;
};

/**
 * Simple Token Validation
 *
 * @param token
 */
export const validateToken = (token: string): boolean => {
    const secret_token = 'pk_test_0ae8dW2FpEAZlxlz';
    return token === secret_token;
};

export const getDataByToken = (token: any): any | string => {
    const jwtSecretKey: any = process.env.JWT_SECRET;
    return verify(token, jwtSecretKey);
};
