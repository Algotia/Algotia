export interface StrategyMetaData {
    language: "javascript" | "typescript";
    path: string;
    basename: string;
}

export interface StrategyData extends StrategyMetaData {
    value: string;
}
