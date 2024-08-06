import { FieldConfig } from 'apps/front-end/src/app/model/types/fieldConfig.type';

export class OpenDialog {
  static readonly type = '[Dialog] Open';
  constructor(
    public payload: {
      item: any;
      isNew: boolean;
      dialogTitle: string;
      fieldConfigs: FieldConfig[];
    }
  ) {}
}

export class CloseDialog {
  static readonly type = '[Dialog] Close';
}

export class SaveDialogState {
  static readonly type = '[Dialog] Save State';
  constructor(public payload: { item: any }) {}
}
