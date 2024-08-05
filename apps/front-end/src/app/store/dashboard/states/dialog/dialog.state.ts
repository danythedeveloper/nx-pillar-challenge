import { State, Action, StateContext, Selector } from '@ngxs/store';
import { OpenDialog, CloseDialog, SaveDialogState } from './dialog.actions';

export interface DialogStateModel {
  dialogVisible: boolean;
  selectedItem: any;
  isNewItem: boolean;
  dialogTitle: string;
}

@State<DialogStateModel>({
  name: 'dialog',
  defaults: {
    dialogVisible: false,
    selectedItem: null,
    isNewItem: false,
    dialogTitle: '',
  },
})
export class DialogState {
  @Selector()
  static dialogData(state: DialogStateModel) {
    return {
      dialogVisible: state.dialogVisible,
      selectedItem: state.selectedItem,
      isNewItem: state.isNewItem,
      dialogTitle: state.dialogTitle,
    };
  }
  @Action(OpenDialog)
  openDialog(ctx: StateContext<DialogStateModel>, action: OpenDialog) {
    console.log('Action open dialog');

    ctx.patchState({
      dialogVisible: true,
      selectedItem: action.payload.item,
      isNewItem: action.payload.isNew,
      dialogTitle: action.payload.dialogTitle,
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
