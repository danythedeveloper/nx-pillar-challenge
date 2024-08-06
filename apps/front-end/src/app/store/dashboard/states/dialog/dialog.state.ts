import { State, Action, StateContext, Selector } from '@ngxs/store';
import { OpenDialog, CloseDialog, SaveDialogState } from './dialog.actions';
import { FieldConfig } from 'apps/front-end/src/app/model/types/fieldConfig.type';
import { Injectable } from '@angular/core';

export interface DialogStateModel {
  dialogVisible: boolean;
  selectedItem: any;
  isNewItem: boolean;
  dialogTitle: string;
  fieldConfigs: FieldConfig[];
}

@State<DialogStateModel>({
  name: 'dialog',
  defaults: {
    dialogVisible: false,
    selectedItem: null,
    isNewItem: false,
    dialogTitle: '',
    fieldConfigs: [],
  },
})
@Injectable()
export class DialogState {
  @Selector()
  static dialogData(state: DialogStateModel): DialogStateModel {
    return {
      dialogVisible: state.dialogVisible,
      selectedItem: state.selectedItem,
      isNewItem: state.isNewItem,
      dialogTitle: state.dialogTitle,
      fieldConfigs: state.fieldConfigs,
    };
  }
  @Action(OpenDialog)
  openDialog(ctx: StateContext<DialogStateModel>, action: OpenDialog) {
    ctx.patchState({
      dialogVisible: true,
      selectedItem: action.payload.item,
      isNewItem: action.payload.isNew,
      dialogTitle: action.payload.dialogTitle,
      fieldConfigs: action.payload.fieldConfigs,
    });
  }

  @Action(CloseDialog)
  closeDialog(ctx: StateContext<DialogStateModel>) {
    ctx.patchState({
      dialogVisible: false,
      selectedItem: null,
      isNewItem: false,
    });
  }

  @Action(SaveDialogState)
  saveDialogState(
    ctx: StateContext<DialogStateModel>,
    action: SaveDialogState
  ) {
    ctx.patchState({
      selectedItem: action.payload.item,
    });
  }
}
