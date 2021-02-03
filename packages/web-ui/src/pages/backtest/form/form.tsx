import { useEffect, useState, FC, Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { parsePair } from "@algotia/core";
import { Button, Paper, styled as muiStyled } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Row } from "../../../components/shared";
import SelectExchange from "./selectExchange";
import SelectDate from "./selectDates";
import SelectInitialBalance from "./selectInitialBalance";
import SelectPair from "./selectPair";
import SelectPeriod from "./selectPeriod";
import { DefaultApi, ExchangeID } from "@algotia/client";

const FormWrapper = muiStyled(Paper)(() => ({
    width: "100%",
    height: "60%",
    padding: "15px 0",
    position: "relative",
    border: "1px solid #fff",
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
    width: 80%;
    justify-content: space-between;
`;
const client = new DefaultApi();

const Form: FC<{
    setOptions: Dispatch<SetStateAction<any | undefined>>;
}> = (props) => {
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
        if (exchangeId && to && from && period && pair) {
            const body = {
                exchange: exchangeId,
                to: new Date(to.toUTCString()).getTime(),
                from: new Date(from.toUTCString()).getTime(),
                pair: pair,
                period,
                initialBalance: {
                    [baseCurrency]: baseAmount,
                    [quoteCurrency]: quoteAmount,
                },
            };
            props.setOptions(body);
        }
    };

    return (
        <FormWrapper elevation={0}>
            <FormBody>
                <FormItem>
                    <SelectExchange
                        exchangeId={exchangeId}
                        setExchangeId={setExchangeId}
                    />
                </FormItem>
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
                        />{" "}
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
                        focus={!!period}
                    />
                </RowItem>
                <RowItem>
                    <SelectInitialBalance
                        focus={!!pair}
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
                    <Button
                        disabled={!canRun}
                        onClick={run}
                    >
                        Run
                    </Button>
                </FormItem>
            </FormBody>
        </FormWrapper>
    );
};

export default Form;
