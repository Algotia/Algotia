import { useEffect, useState, FC, Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { parsePair } from "@algotia/core";
import { Box, Button, Fab, styled as muiStyled } from "@material-ui/core";
import { Row } from "../../../components/shared";
import SelectExchange from "./selectExchange";
import SelectDate from "./selectDates";
import SelectInitialBalance from "./selectInitialBalance";
import SelectPair from "./selectPair";
import SelectPeriod from "./selectPeriod";
import { DefaultApi, ExchangeID, StrategyMetaData } from "@algotia/client";
import SelectStrategy from "./selectStrategy";

const FormWrapper = muiStyled(Box)(({ theme }) => ({
    width: "100%",
    height: "60%",
    padding: theme.spacing(1),
    position: "relative",
}));

const RunBtn = muiStyled(Fab)(({ theme }) => ({
    backgroundColor: theme.palette.success.main,
}));

const FormBody = styled.div`
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
`;

const FormItem = styled(Row)`
    width: 45%;
    align-items: center;
    justify-content: center;
`;

const RowItem = styled(FormItem)`
    width: 100%;
    justify-content: space-between;
`;

const client = new DefaultApi();

const Form: FC<{
    setOptions: Dispatch<SetStateAction<any | undefined>>;
    setStrategyMeta: Dispatch<SetStateAction<StrategyMetaData | undefined>>;
    strategyMeta: StrategyMetaData | undefined;
}> = ({ setStrategyMeta, strategyMeta, setOptions }) => {
    const [pairList, setPairList] = useState<string[]>();
    const [periodList, setTimeframeList] = useState<string[]>();
    const [currencyList, setCurrencyList] = useState<string[]>();

    let now = new Date();

    now.setHours(0, 0, 0);

    now.setMilliseconds(0);

    const initialTo = new Date(now);

    now.setMonth(now.getMonth() - 1);

    const initialFrom = new Date(now);

    const [exchangeId, setExchangeId] = useState<ExchangeID>("" as ExchangeID);
    const [pair, setPair] = useState("");
    const [period, setPeriod] = useState<string>("");
    const [to, setTo] = useState<Date>(initialTo);
    const [from, setFrom] = useState<Date>(initialFrom);
    const [baseCurrency, setBaseCurrency] = useState("");
    const [quoteCurrency, setQuoteCurrency] = useState("");
    const [baseAmount, setBaseAmount] = useState(0);
    const [quoteAmount, setQuoteAmount] = useState(0);

    const [canRun, setCanRun] = useState(false);

    useEffect(() => {
        if (exchangeId) {
            client.getPairs(exchangeId).then((res) => {
                setPairList(res.data);
            });
            client.getTimeFrames(exchangeId).then((res) => {
                setTimeframeList(Object.keys(res.data));
            });
            setPair("");
            setPeriod("");
            setBaseCurrency("");
            setBaseAmount(0);
            setQuoteCurrency("");
            setQuoteAmount(0);
        }
    }, [exchangeId]);

    useEffect(() => {
        if (pair) {
            const [base, quote] = parsePair(pair);
            setBaseCurrency(base);
            setBaseAmount(0);
            setQuoteCurrency(quote);
            setQuoteAmount(0);
        }
    }, [pair]);

    useEffect(() => {
        if (to && from && pair && period) {
            setCanRun(true);
        } else {
            setCanRun(false);
        }
    }, [to, from, pair, period]);

    const run = () => {
        if (strategyMeta && exchangeId && to && from && period && pair) {
            const body = {
                exchange: exchangeId,
                to: new Date(to.toUTCString()).getTime(),
                from: new Date(from.toUTCString()).getTime(),
                pair: pair,
                period,
                strategyPath: strategyMeta.path,
                initialBalance: {
                    [baseCurrency]: baseAmount,
                    [quoteCurrency]: quoteAmount,
                },
            };
            setOptions(body);
        }
    };

    return (
        <FormWrapper>
            <FormBody>
                <RowItem>
                    <FormItem>
                        <SelectStrategy setStrategyMeta={setStrategyMeta} />
                    </FormItem>
                    <FormItem>
                        <SelectExchange
                            exchangeId={exchangeId}
                            setExchangeId={setExchangeId}
                            strategyMeta={strategyMeta}
                        />
                    </FormItem>
                </RowItem>
                <RowItem>
                    <FormItem>
                        <SelectDate
                            exchangeId={exchangeId}
                            setDate={setFrom}
                            date={from}
                            label="From"
                            minDate={new Date("01/01/2015")}
                        />
                    </FormItem>

                    <FormItem>
                        <SelectDate
                            exchangeId={exchangeId}
                            setDate={setTo}
                            date={to}
                            label="To"
                            minDate={new Date(from ? from : "01/01/2015")}
                        />
                    </FormItem>
                </RowItem>
                <RowItem>
                    <FormItem>
                        <SelectPair
                            pairList={pairList}
                            setPair={setPair}
                            pair={pair}
                        />
                    </FormItem>
                    <FormItem>
                        <SelectPeriod
                            pair={pair}
                            period={period}
                            setPeriod={setPeriod}
                            periodList={periodList}
                        />
                    </FormItem>
                </RowItem>
                <RowItem>
                    <SelectInitialBalance
                        id="base"
                        currency={baseCurrency}
                        setCurrency={setBaseCurrency}
                        amount={baseAmount}
                        setAmount={setBaseAmount}
                        pair={pair}
                        FormItem={FormItem}
                        currencyList={currencyList}
                        onChange={({ amount }) => {
                            setBaseAmount(amount);
                        }}
                    />
                </RowItem>
                <RowItem>
                    <SelectInitialBalance
                        FormItem={FormItem}
                        id="quote"
                        currency={quoteCurrency}
                        setCurrency={setQuoteCurrency}
                        amount={quoteAmount}
                        setAmount={setQuoteAmount}
                        pair={pair}
                        currencyList={currencyList}
                        onChange={({ amount }) => {
                            setQuoteAmount(amount);
                        }}
                    />
                </RowItem>
                <FormItem>
                    <RunBtn disabled={!canRun} onClick={run}>
                        Run
                    </RunBtn>
                </FormItem>
            </FormBody>
        </FormWrapper>
    );
};

export default Form;
