import { useParams } from "react-router-dom";

export const TradePage: React.FC = () => {
    let { id } = useParams();

    return (
        <><p className="text-white">Trade for {id}</p></>
    )
}
