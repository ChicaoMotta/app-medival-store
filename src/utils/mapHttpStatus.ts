const mapHttpStatus = (httpStatus: string): number => {
  const HttpStatusMap: Record<string, number> = {
    SUCCESSFUL: 200,
    NOT_FOUND: 404,
    CREATED: 201,
    ERROR: 500,
    INVALID_DATA: 400,
  };

  return HttpStatusMap[httpStatus];
};

export default mapHttpStatus;