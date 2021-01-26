export interface StrategyMetaData {
    language: "JavaScript" | "TypeScript";
    modifiedAt: number;
    path: string;
    basename: string;
}
export interface StrategyData extends StrategyMetaData {
    value: string;
}
export interface StrategyTemplateOptions {
    exchangeId: string;
    pair: string;
    initialBalance: Record<string, number>;
}
