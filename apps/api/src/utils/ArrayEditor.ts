export interface SingleArrayEditor<T> {
  delete: boolean;
  value: T;
}

export type ArrayEditor<T> = SingleArrayEditor<T>[];
