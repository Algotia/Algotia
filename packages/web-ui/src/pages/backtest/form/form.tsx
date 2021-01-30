import {
    useEffect,
    useState,
    FC,
    Dispatch,
    SetStateAction,
    useContext,
} from "react";
import styled from "styled-components";
import { parsePair, parsePeriod } from "@algotia/core";
import { Button, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Row } from "../../../components/shared";
import { BacktestContext } from "../context";
import SelectExchange from "./selectExchange";
import SelectDate from "./selectDates";
import SelectInitialBalance from "./selectInitialBalance";
import SelectPair from "./selectPair";
import SelectPeriod from "./selectPeriod";
import { DefaultApi, ExchangeID } from "@algotia/client";

const FormWrapper = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 60%;
    background-color: #ffffff;
    position: relative;
    box-sizing: border-box;
`;

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

const useStyles = makeStyles({
    root: {
        height: "50px",
        width: "100px",
        fontSize: "20px",
        boxSizing: "border-box",
    },
    primary: {
        backgroundColor: "#20ad16",
    },
    disabled: {
        backgroundColor: "grey",
    },
});

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

    const classes = useStyles();

    const buttonClasses = `${classes.root} ${
        (canRun && classes.primary) || classes.disabled
    }`;

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
        <FormWrapper>
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
                        className={buttonClasses}
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
