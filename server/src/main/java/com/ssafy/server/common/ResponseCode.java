package com.ssafy.server.common;

public interface ResponseCode {

    String SUCCESS = "SU";
    String VALIDATION_FAIL = "VF";
    String DUPLICATE_EMAIL = "DE";

    String SIGN_IN_FAIL = "SF";
    String CERTIFICATION_FAIL = "CF";

    String MAIL_FAIL="MF";
    String DATABASE_ERROR = "DBE";

    String CONFLICT = "CF";
    String NOT_FOUND = "NF";
    String UNAUTHORIZED = "UA";
    String BAD_REQUEST = "BQ";

}
