interface IOnActionArgs<T> {
  type: ActionType;
  data?: T;
}

export type TOnAction<T = undefined> = ({
  type,
  data
}: IOnActionArgs<T>) => void;

export enum ActionType {
  UPDATE_QUESTION = 'question/update',
  UPDATE_SOLUTION = 'solution/update',
  UPDATE_NAME = 'name/update',
  SUBMIT_FORM = 'form/submit',
  OPEN_SCOREBOARD = 'scoreboard/open',
  CLOSE_SCOREBOARD = 'scoreboard/close'
}
