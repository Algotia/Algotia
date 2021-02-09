import {
    Button,
    FormControl,
    InputLabel,
    makeStyles,
    MenuItem,
    Modal,
    Paper,
    Select,
} from "@material-ui/core";
import { useContext, useState } from "react";
import { FaCog } from "react-icons/fa";
import { ThemeSetterContext } from "../../App";
import { AllThemes, themes } from "../../assets/styles";
import { setCachedTheme } from "../../utils";

const useSettingsBtnStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        position: "absolute",
        bottom: theme.spacing(2),
    },
}));

const useModalStyles = makeStyles((theme) => ({
    root: {
        position: "absolute",
        width: "50%",
        height: "80%",
        left: "25%",
        top: "10%",
        padding: theme.spacing(2),
    },
}));

const Settings = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const themeContext = useContext(ThemeSetterContext);
    const settingsBtnStyles = useSettingsBtnStyles();
    const modalStyles = useModalStyles();

    return (
        <>
            <Button
                classes={settingsBtnStyles}
                onClick={() => {
                    setModalOpen(true);
                }}
            >
                <FaCog size={20} />
            </Button>
            <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
                <Paper classes={modalStyles}>
                    <FormControl>
                        <InputLabel>Theme</InputLabel>
                        <Select
                            value={themeContext.theme}
                            onChange={(e) => {
                                const themeName = e.target
                                    .value as keyof AllThemes;
                                themeContext.setTheme(themeName);
                                setCachedTheme(themeName);
                            }}
                        >
                            {Object.keys(themes).map((key) => (
                                <MenuItem value={key} key={key}>
                                    {key}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Paper>
            </Modal>
        </>
    );
};

export default Settings;
