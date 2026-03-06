import {
    getOffres, getOffrebyAgent, getAgentId, AllMaisonsAgents, AllMaisonsByAgentId, AllMaisonsByAgentName, AllMaisonsSortedAgent,
    bySurfaceAgent, maisonfavoriagent,
    addNewMaison, addNewAgent, DeleteMaisonById, DeleteAgentById, updateMaison, addUser,
    superUserauth, Userauth, pb
} from './backend.mjs';


// Auth admin nécessaire avant les opérations protégées
await superUserauth("lilian.maitre@edu.univ-fcomte.fr", "Bouledeglace90*");
console.log(pb.authStore.isValid, pb.authStore.model?.email);
if (!pb.authStore.isValid) {
    console.error("Échec de l'authentification admin. Arrêt du script.");
    process.exit(1);
}

// IDs cibles (maison / agent) à ajuster si besoin
const targetMaisonId = "3xmblabs6h5yl64";
const targetAgentId = "4ap6udz7udeuufz";

// Vérification d'existence avant delete/update pour éviter les 404
try {
    const checkMaison = await pb.collection('maisons').getOne(targetMaisonId);
    console.log("Maison trouvée pour test :", checkMaison?.id);
} catch (e) {
    console.error("Maison introuvable (avant opérations) =>", e?.status, e?.message || e);
    process.exit(1);
}

try {
    const checkAgent = await pb.collection('Agent').getOne(targetAgentId);
    console.log("Agent trouvé pour test :", checkAgent?.id);
} catch (e) {
    console.error("Agent introuvable (avant opérations) =>", e?.status, e?.message || e);
    process.exit(1);
}


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


try {
    const newMaison = {
        "Nommaison": "MaisonMMI",
        "prix": 250000,
        "nbChambres": 4,
        "nbSdb": 2,
        "adresse": "Montbéiard",
        "surface": 123,
        "favori": true,
        "agent": "g4lct2kno5rn769"
    };

    await addNewMaison(newMaison);
} catch (e) {
    console.error("Erreur lors de l'ajout de la nouvelle maison :", e);
}

try {
    const newAgent = {
        "Nom": "Agent",
        "Prenom": "Test",
        "email": "agenttest@example.com",
    };

    await addNewAgent(newAgent);
} catch (e) {
    console.error("Erreur lors de l'ajout de l'agent :", e);
}

try {
    const deletemaison = await DeleteMaisonById(targetMaisonId);
    console.log("Maison supprimée avec succès :", deletemaison);
} catch (e) {
    console.error("Erreur lors de la suppression de la maison :", e);
}

try {
    const deleteAgentResult = await DeleteAgentById(targetAgentId);
    console.log("Agent supprimé avec succès :", deleteAgentResult);
} catch (e) {
    console.error("Erreur lors de la suppression de l'agent :", e);
}

try {
    const data = {
        "Nommaison": "MaisonMMI",
        "surface": 123,
        "favori": true,
    };

    const updateMaisonResult = await updateMaison(targetMaisonId, data);
    console.log("Maison mise à jour avec succès :", updateMaisonResult);
} catch (e) {
    console.error("Erreur lors de la mise à jour de la maison :", e);
}

pb.authStore.clear();

try {
    if (!pb.authStore.isValid) {
        await superUserauth("lilian.maitre@edu.univ-fcomte.fr", "Bouledeglace90*");
    }

    const newUser = {
        email: "user.test@example.com",
        password: "Test1234*",
        passwordConfirm: "Test1234*",
    };

    const createdUser = await addUser(newUser);
    console.log("Utilisateur créé avec succès :", createdUser?.id);
} catch (e) {
    console.error("Erreur lors de la création de l'utilisateur :", e);
}

try {
    const authData = await Userauth("user.test@example.com", "Test1234*");
    console.log("User auth valid ?", pb.authStore.isValid, pb.authStore.model?.email);
} catch (e) {
    console.error("Erreur lors de l'auth utilisateur :", e);
}

pb.authStore.clear();

