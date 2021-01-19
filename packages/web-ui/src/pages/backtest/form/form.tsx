import {
    useEffect,
    useState,
    FC,
    Dispatch,
    SetStateAction,
    useContext,
} from "react";
import styled from "styled-components";
import { ExchangeID, parsePair, parsePeriod } from "@algotia/core";
import { Button, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Alert } from "@material-ui/lab";
import { Column, Row } from "../../../components/shared";
import moment from "moment";
import { BacktestContext, Options } from "../context";
import SelectExchange from "./selectExchange";
import SelectDate from "./selectDates";
import SelectInitialBalance from "./selectInitialBalance";
import SelectPair from "./selectPair";
import SelectPeriod from "./selectPeriod";

const FormWrapper = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    position: relative;
    box-sizing: border-box;
`;

const FormBody = styled.div`
    width: 100%;
    height: 100%;
    padding: 0 15px;
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

const Form: FC<{
    setOptions: Dispatch<SetStateAction<Options | undefined>>;
}> = (props) => {
    const [pairList, setPairList] = useState<string[]>();
    const [periodList, setTimeframeList] = useState<string[]>();
    const [currencyList, setCurrencyList] = useState<string[]>();
    const [periodInfo, setPeriodInfo] = useState<
        ReturnType<typeof parsePeriod>
    >();

	let now = new Date()

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
    const [initialBalance, setIntialBalance] = useState<Record<string, number>>(
        {}
    );

    const [isTimeError, setTimeError] = useState(false);

    const [canRun, setCanRun] = useState(false);

    useEffect(() => {
        if (exchangeId) {
            console.log(initialBalance);
            fetch(
                `/api/exchange?id=${exchangeId}&symbols=true&timeframes=true&currencies=true`
            )
                .then((res) => {
                    return res.json();
                })
                .then((res) => {
                    setPairList(res.symbols);
                    setTimeframeList(Object.keys(res.timeframes));
                    setCurrencyList(Object.keys(res.currencies));
                })
                .catch((err) => {
                    alert(err);
                });
        }
    }, [exchangeId]);

    useEffect(() => {
        setTimeError(
            Boolean(
                period &&
                    to &&
                    from &&
                    to.getTime() - from.getTime() < parsePeriod(period).periodMs
            )
        );
        if (period) {
            setPeriodInfo(parsePeriod(period));
        }
    }, [to, from, period]);

    useEffect(() => {
        if (pair) {
            const [base, quote] = parsePair(pair);
            setIntialBalance({
                [base]: 0,
                [quote]: 0,
            });
        }
    }, [pair]);

    useEffect(() => {
        if (to && from && pair && period && initialBalance) {
            setCanRun(true);
        }
    }, [to, from, pair, period, initialBalance]);

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
                initialBalance,
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
                {isTimeError && periodInfo && (
                    <Alert
                        severity="warning"
                        style={{ width: "95%", margin: "10px 0" }}
                    >
                        Parameter "From" must be at least {periodInfo.amount}{" "}
                        {periodInfo.unitLabel} behind "To"
                    </Alert>
                )}
                <RowItem>
                    <FormItem>
                        <SelectDate
                            exchangeId={exchangeId}
                            isTimeError={isTimeError}
                            setDate={setFrom}
                            date={from}
                            label="From"
                            minDate={new Date("01/01/2015")}
                        />
                    </FormItem>

                    <FormItem>
                        <SelectDate
                            exchangeId={exchangeId}
                            isTimeError={isTimeError}
                            setDate={setTo}
                            date={to}
                            label="To"
                            minDate={new Date(from ? from : "01/01/2015")}
                        />
                    </FormItem>
                </RowItem>
                <RowItem>
                    <FormItem>
                        <SelectPair pairList={pairList} setPair={setPair} />
                    </FormItem>
                    <FormItem>
                        <SelectPeriod
                            period={period}
                            setPeriod={setPeriod}
                            periodList={periodList}
                        />
                    </FormItem>
                </RowItem>
                <RowItem>
                    <SelectInitialBalance
                        id="base"
                        FormItem={FormItem}
                        initialCurrency={pair.split("/")[0]}
                        currencyList={currencyList}
                        onChange={({ amount, currency }) => {
                            console.log("am", amount);
                            console.log("cu", currency);
                            setIntialBalance(
                                Object.assign(initialBalance, {
                                    [currency]: amount,
                                })
                            );
                            console.log(initialBalance);
                        }}
                    />
                </RowItem>
                <RowItem>
                    <SelectInitialBalance
                        FormItem={FormItem}
                        id="quote"
                        initialCurrency={pair.split("/")[1]}
                        currencyList={currencyList}
                        onChange={({ amount, currency }) => {
                            setIntialBalance(
                                Object.assign(initialBalance, {
                                    [currency]: amount,
                                })
                            );
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
