export interface StrategyMetaData {
    modifiedAt: number;
    basename: string;
    path: string;
    language: "JavaScript" | "TypeScript";
}
export interface StrategyTemplateOptions {
    pair: string;
}
