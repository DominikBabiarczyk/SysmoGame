import SettingsBox from '../../components/settingsBox';

type SettingsInMenuProps = {
    setSettingsWindow: (value: boolean) => void;
}

const settingsInMenu: React.FC<SettingsInMenuProps> = ({setSettingsWindow}) => {

const backToMenu = () => {
    setSettingsWindow(false);
} 

return(
    <div className="flex justify-center items-center absolute top-0 left-0 w-full h-full bg-black bg-opacity-80 text-white">
        <div className="relative w-full h-full flex flex-col text-white justify-center items-center">
        <button
            className="absolute top-4 left-4 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-3 rounded-xl"
            onClick={backToMenu}
        >
            <img src="/images/backArrow.png" className="pr-1" />
        </button>
        <SettingsBox />
        </div>
    </div>
)
}

 export default settingsInMenu