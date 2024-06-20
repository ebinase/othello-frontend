export class Result<T, E extends Error> {
  private readonly value: T | E;

  private constructor(value: T | E) {
    this.value = value;
  }

  static success<T>(value: T): Result<T, Error> {
    return new Result<T, Error>(value);
  }

  static failure<E extends Error>(error: E): Result<any, E> {
    return new Result<any, E>(error);
  }

  when({
    success,
    failure,
  }: {
    success: (data: T) => any;
    failure: (error: E) => any;
  }) {
    if (this.value instanceof Error) {
      return failure(this.value);
    } else {
      return success(this.value);
    }
  }
}
