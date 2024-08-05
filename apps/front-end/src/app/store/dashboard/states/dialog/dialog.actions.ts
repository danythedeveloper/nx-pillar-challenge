export class OpenDialog {
  static readonly type = '[Dialog] Open';
  constructor(
    public payload: { item: any; isNew: boolean; dialogTitle: string }
  ) {}
}

export class CloseDialog {
  static readonly type = '[Dialog] Close';
}

export class SaveDialogState {
  static readonly type = '[Dialog] Save State';
  constructor(public payload: { item: any }) {}
}
