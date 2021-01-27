import type { CreateBacktestOptions } from '../models/CreateBacktestOptions';
import type { CreateBacktestResult } from '../models/CreateBacktestResult';
import type { ExchangeID } from '../models/ExchangeID';
import type { GetStrategyResult } from '../models/GetStrategyResult';
import type { IDictionary_number_or_string_ } from '../models/IDictionary_number_or_string_';
import type { Market } from '../models/Market';
import type { Record_ExchangeID_boolean_ } from '../models/Record_ExchangeID_boolean_';
export declare class Service {
    /**
     * @returns CreateBacktestResult Ok
     * @throws ApiError
     */
    static createBacktest({ requestBody, }: {
        requestBody: CreateBacktestOptions;
    }): Promise<CreateBacktestResult>;
    /**
     * @returns any Ok
     * @throws ApiError
     */
    static getAllConfigOptions(): Promise<any>;
    /**
     * @returns any Ok
     * @throws ApiError
     */
    static getConfigOptionByKey({ key, }: {
        key: 'port' | 'appDir';
    }): Promise<(string | number)>;
    /**
     * @returns string Ok
     * @throws ApiError
     */
    static getExchangeIds(): Promise<Array<string>>;
    /**
     * @returns Record_ExchangeID_boolean_ Ok
     * @throws ApiError
     */
    static getExchangeStatuses(): Promise<Record_ExchangeID_boolean_>;
    /**
     * @returns Market Ok
     * @throws ApiError
     */
    static getMarket({ id, pair, }: {
        id: ExchangeID;
        pair: string;
    }): Promise<Market>;
    /**
     * @returns IDictionary_number_or_string_ Ok
     * @throws ApiError
     */
    static getTimeFrames({ id, }: {
        id: ExchangeID;
    }): Promise<IDictionary_number_or_string_>;
    /**
     * @returns string Ok
     * @throws ApiError
     */
    static getPairs({ id, }: {
        id: ExchangeID;
    }): Promise<Array<string>>;
    /**
     * @returns GetStrategyResult Ok
     * @throws ApiError
     */
    static getStrategyByFilename({ fileName, }: {
        fileName: string;
    }): Promise<GetStrategyResult>;
}
//# sourceMappingURL=Service.d.ts.map