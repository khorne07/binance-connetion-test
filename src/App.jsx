import "./App.css";
import { useState, useEffect } from "react";

const App = () => {
	const [, setTradeSocket] = useState(null);
	const [, setMarketSocket] = useState(null);
	const [tradeMessages, setTradeMessages] = useState([]);
	const [marketPrice, setMarketPrice] = useState(null);

	useEffect(() => {
		const tradeWS = new WebSocket(
			"wss://testnet.binancefuture.com/ws/btcusdt@trade"
		);
		const marketWS = new WebSocket(
			"wss://testnet.binancefuture.com/ws/btcusdt@markPrice"
		);
		setTradeSocket(tradeWS);
		setMarketSocket(marketWS);

		tradeWS.onmessage = (event) => {
			setTradeMessages((prevMessages) => [
				...prevMessages,
				JSON.parse(event.data),
			]);
		};
		marketWS.onmessage = (event) => {
			setMarketPrice(JSON.parse(event.data));
		};

		return () => {
			tradeWS.close();
			marketWS.close();
		};
	}, [setTradeSocket, setMarketSocket, setTradeMessages]);

	return (
		<section>
			<h1>Bitcoin Infos (BTC/USDT)</h1>
			<div className="market-prices">
				<div>
					<p>Bid</p>
					<p>{marketPrice?.p}</p>
				</div>
				<div>
					<p>Ask</p>
					<p>{marketPrice?.i}</p>
				</div>
			</div>
			<h2>Bitcoin Live Trades</h2>
			<table>
				<thead>
					<tr>
						<th>Trade Side</th>
						<th>Trade Price</th>
						<th>Trade Volume</th>
						<th>Trade Time</th>
					</tr>
				</thead>
				<tbody>
					{tradeMessages?.map((item, index) => (
						<tr key={`${item.E}${index}`} className={index % 2 === 0 && "light-backg"}>
							<td>{item.X}</td>
							<td>{item.p}</td>
							<td>{item.q}</td>
							<td>
								{new Date(item.T).toLocaleString("en-GB", {
									day: "2-digit",
									month: "2-digit",
									year: "numeric",
									hour: "2-digit",
									minute: "2-digit",
									second: "2-digit",
								})}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</section>
	);
};

export default App;
