import { CardActionType, Card, UrlType } from "../types";

interface ActionApi {
  openScreen: (
    screenType: string,
    valuesParam: { key: string; value: string }[]
  ) => Promise<boolean>;
  screenShare: () => Promise<boolean>;
  scanCode: () => Promise<String>;
  openUrl: (url: string, type: UrlType) => Promise<boolean>;
  postCard: (type: CardActionType, card: Card) => Promise<string>;
}
export default ActionApi;
