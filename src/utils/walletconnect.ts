// import SignClient from "@walletconnect/sign-client";
// import { SessionTypes } from "@walletconnect/types";

// const chains = [1];
// const projectId = "731b0f63c4f230e20a3b8ead15cfed18";

// const signClient = await SignClient.init({
//   projectId: "<YOUR_PROJECT_ID>",
//   metadata: {
//     name: "Example Dapp",
//     description: "Example Dapp",
//     url: "#",
//     icons: ["https://walletconnect.com/walletconnect-logo.png"],
//   },
// });

// signClient.on("session_event", ({}) => {
//   // Handle session events, such as "chainChanged", "accountsChanged", etc.
// });

// signClient.on("session_update", ({ topic, params }) => {});

// signClient.on("session_delete", () => {
//   // Session was deleted -> reset the dapp state, clean up from user session, etc.
// });

// try {
//   const { uri, approval } = await signClient.connect({
//     // Optionally: pass a known prior pairing (e.g. from `signClient.core.pairing.getPairings()`) to skip the `uri` step.
//     pairingTopic: pairing?.topic,
//     // Provide the namespaces and chains (e.g. `eip155` for EVM-based chains) we want to use in this session.
//     requiredNamespaces: {
//       eip155: {
//         methods: [
//           "eth_sendTransaction",
//           "eth_signTransaction",
//           "eth_sign",
//           "personal_sign",
//           "eth_signTypedData",
//         ],
//         chains: ["eip155:1"],
//         events: ["chainChanged", "accountsChanged"],
//       },
//     },
//   });

//   //如果返回URI，则打开QRCode模式(即我们没有连接现有的配对)。
//   if (uri) {
//     QRCodeModal.open(uri, () => {
//       console.log("EVENT", "QR Code Modal closed");
//     });
//   }

//   // 等待钱包的会话批准。
//   const session = await approval();
//   // 处理返回的会话(例如，将UI更新为“connected”状态)。
//   await onSessionConnected(session);
// } catch (e) {
//   console.error(e);
// } finally {
//   // 关闭QRCode模式，以防它是打开的。
//   QRCodeModal.close();
// }

// function onSessionConnected(session: SessionTypes.Struct) {
//   throw new Error("Function not implemented.");
// }
