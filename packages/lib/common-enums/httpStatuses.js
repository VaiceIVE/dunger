/**
 * Http статус-коды, для прикрепления к ответам и используемые в объектах ошибок
 */
export var HttpStatus;
(function (HttpStatus) {
  HttpStatus[(HttpStatus['CONTINUE'] = 100)] = 'CONTINUE';
  HttpStatus[(HttpStatus['SWITCHING_PROTOCOLS'] = 101)] = 'SWITCHING_PROTOCOLS';
  HttpStatus[(HttpStatus['PROCESSING'] = 102)] = 'PROCESSING';
  HttpStatus[(HttpStatus['EARLYHINTS'] = 103)] = 'EARLYHINTS';
  HttpStatus[(HttpStatus['OK'] = 200)] = 'OK';
  HttpStatus[(HttpStatus['CREATED'] = 201)] = 'CREATED';
  HttpStatus[(HttpStatus['ACCEPTED'] = 202)] = 'ACCEPTED';
  HttpStatus[(HttpStatus['NON_AUTHORITATIVE_INFORMATION'] = 203)] = 'NON_AUTHORITATIVE_INFORMATION';
  HttpStatus[(HttpStatus['NO_CONTENT'] = 204)] = 'NO_CONTENT';
  HttpStatus[(HttpStatus['RESET_CONTENT'] = 205)] = 'RESET_CONTENT';
  HttpStatus[(HttpStatus['PARTIAL_CONTENT'] = 206)] = 'PARTIAL_CONTENT';
  HttpStatus[(HttpStatus['AMBIGUOUS'] = 300)] = 'AMBIGUOUS';
  HttpStatus[(HttpStatus['MOVED_PERMANENTLY'] = 301)] = 'MOVED_PERMANENTLY';
  HttpStatus[(HttpStatus['FOUND'] = 302)] = 'FOUND';
  HttpStatus[(HttpStatus['SEE_OTHER'] = 303)] = 'SEE_OTHER';
  HttpStatus[(HttpStatus['NOT_MODIFIED'] = 304)] = 'NOT_MODIFIED';
  HttpStatus[(HttpStatus['TEMPORARY_REDIRECT'] = 307)] = 'TEMPORARY_REDIRECT';
  HttpStatus[(HttpStatus['PERMANENT_REDIRECT'] = 308)] = 'PERMANENT_REDIRECT';
  HttpStatus[(HttpStatus['BAD_REQUEST'] = 400)] = 'BAD_REQUEST';
  HttpStatus[(HttpStatus['UNAUTHORIZED'] = 401)] = 'UNAUTHORIZED';
  HttpStatus[(HttpStatus['PAYMENT_REQUIRED'] = 402)] = 'PAYMENT_REQUIRED';
  HttpStatus[(HttpStatus['FORBIDDEN'] = 403)] = 'FORBIDDEN';
  HttpStatus[(HttpStatus['NOT_FOUND'] = 404)] = 'NOT_FOUND';
  HttpStatus[(HttpStatus['METHOD_NOT_ALLOWED'] = 405)] = 'METHOD_NOT_ALLOWED';
  HttpStatus[(HttpStatus['NOT_ACCEPTABLE'] = 406)] = 'NOT_ACCEPTABLE';
  HttpStatus[(HttpStatus['PROXY_AUTHENTICATION_REQUIRED'] = 407)] = 'PROXY_AUTHENTICATION_REQUIRED';
  HttpStatus[(HttpStatus['REQUEST_TIMEOUT'] = 408)] = 'REQUEST_TIMEOUT';
  HttpStatus[(HttpStatus['CONFLICT'] = 409)] = 'CONFLICT';
  HttpStatus[(HttpStatus['GONE'] = 410)] = 'GONE';
  HttpStatus[(HttpStatus['LENGTH_REQUIRED'] = 411)] = 'LENGTH_REQUIRED';
  HttpStatus[(HttpStatus['PRECONDITION_FAILED'] = 412)] = 'PRECONDITION_FAILED';
  HttpStatus[(HttpStatus['PAYLOAD_TOO_LARGE'] = 413)] = 'PAYLOAD_TOO_LARGE';
  HttpStatus[(HttpStatus['URI_TOO_LONG'] = 414)] = 'URI_TOO_LONG';
  HttpStatus[(HttpStatus['UNSUPPORTED_MEDIA_TYPE'] = 415)] = 'UNSUPPORTED_MEDIA_TYPE';
  HttpStatus[(HttpStatus['REQUESTED_RANGE_NOT_SATISFIABLE'] = 416)] = 'REQUESTED_RANGE_NOT_SATISFIABLE';
  HttpStatus[(HttpStatus['EXPECTATION_FAILED'] = 417)] = 'EXPECTATION_FAILED';
  HttpStatus[(HttpStatus['I_AM_A_TEAPOT'] = 418)] = 'I_AM_A_TEAPOT';
  HttpStatus[(HttpStatus['MISDIRECTED'] = 421)] = 'MISDIRECTED';
  HttpStatus[(HttpStatus['UNPROCESSABLE_ENTITY'] = 422)] = 'UNPROCESSABLE_ENTITY';
  HttpStatus[(HttpStatus['FAILED_DEPENDENCY'] = 424)] = 'FAILED_DEPENDENCY';
  HttpStatus[(HttpStatus['PRECONDITION_REQUIRED'] = 428)] = 'PRECONDITION_REQUIRED';
  HttpStatus[(HttpStatus['TOO_MANY_REQUESTS'] = 429)] = 'TOO_MANY_REQUESTS';
  HttpStatus[(HttpStatus['INTERNAL_SERVER_ERROR'] = 500)] = 'INTERNAL_SERVER_ERROR';
  HttpStatus[(HttpStatus['NOT_IMPLEMENTED'] = 501)] = 'NOT_IMPLEMENTED';
  HttpStatus[(HttpStatus['BAD_GATEWAY'] = 502)] = 'BAD_GATEWAY';
  HttpStatus[(HttpStatus['SERVICE_UNAVAILABLE'] = 503)] = 'SERVICE_UNAVAILABLE';
  HttpStatus[(HttpStatus['GATEWAY_TIMEOUT'] = 504)] = 'GATEWAY_TIMEOUT';
  HttpStatus[(HttpStatus['HTTP_VERSION_NOT_SUPPORTED'] = 505)] = 'HTTP_VERSION_NOT_SUPPORTED';
})(HttpStatus || (HttpStatus = {}));
//# sourceMappingURL=httpStatuses.js.map
