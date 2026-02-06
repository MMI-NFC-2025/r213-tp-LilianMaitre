import { getOffres, getOffrebyAgent, getAgentId, AllMaisonsAgents, AllMaisonsByAgentId, AllMaisonsByAgentName, AllMaisonsSortedAgent
    , bySurfaceAgent, maisonfavoriagent
 } from './backend.mjs';


const agentId = await getAgentId("3xmblabs6h5yl64");
console.log(JSON.stringify(agentId, null, 2));

const offres = await getOffres();
console.log(JSON.stringify(offres, null, 2));

const offresByAgent = await getOffrebyAgent(agentId.id);
console.log(JSON.stringify(offresByAgent, null, 2));

const allMaisonsAgents = await AllMaisonsAgents();
console.log(JSON.stringify(allMaisonsAgents, null, 2));

const allMaisonsByAgentId = await AllMaisonsByAgentId("3xmblabs6h5yl64");
console.log(JSON.stringify(allMaisonsByAgentId, null, 2));

const allMaisonsByAgentName = await AllMaisonsByAgentName("Pilian");
console.log(JSON.stringify(allMaisonsByAgentName, null, 2));

const allMaisonsSortedAgent = await AllMaisonsSortedAgent();
console.log(JSON.stringify(allMaisonsSortedAgent, null, 2));

const bySurfaceAgentResult = await bySurfaceAgent(100, "3xmblabs6h5yl64");
console.log(JSON.stringify(bySurfaceAgentResult, null, 2));

const maisonfavoriagentresult = await maisonfavoriagent(true, "pg4okxlsknd4qbv");
console.log(JSON.stringify(maisonfavoriagentresult, null, 2));