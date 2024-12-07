import { CardActionType, Card } from "../types";

interface ActionApi {
  openScreen: (
    screenType: string,
    valuesParam: { key: string; value: string }[]
  ) => Promise<boolean>;
  screenShare: () => Promise<boolean>;
  postCard: (type: CardActionType, card: Card) => Promise<string>;
}
export default ActionApi;
