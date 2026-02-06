
import PocketBase from 'pocketbase';

const db = new PocketBase('http://127.0.0.1:8090');

export async function getOffres() {
    try {
        let data = await db.collection('maisons').getFullList({
            sort: '-created',
        });
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la liste des maisons', error);
        return null;
    }
}

export async function getImageUrl(record, recordImage) {
    return db.files.getURL(record, recordImage);
}

export async function getOffrebyAgent(agentId) {
    try {
        let data = await db.collection('maisons').getFullList({
            filter: `Agent = "${agentId}"`,
            sort: '-created',
        });
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function getAgentId(agentId) {
    try {
        let data = await db.collection('Agent').getOne(agentId);
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant les informations de l\'agent', error);
        return null;
    }
}

export async function AllMaisonsAgents() {
    try {
        let data = await db.collection('maisons').getFullList({
            sort: '-created',
            expand: 'Agent'
        });
        return { data };
    } catch (error) {
        console.log('Une erreur est survenue en lisant les maisons et les agents', error);
        return null;
    }
}

export async function AllMaisonsByAgentId(agentId) {
    try {
        let data = await db.collection('maisons').getFullList({
            sort: '-created',
            expand: 'Agent',
            filter: `Agent = "${agentId}"`
        });
        return { data };
    } catch (error) {
        console.log('Une erreur est survenue en lisant les maisons et les agents', error);
        return null;
    }
}

export async function AllMaisonsByAgentName(Prenom) {
    try {

        const agent = await db.collection('Agent').getFirstListItem(
            `Prenom="${Prenom}"`
        );

        let data = await db.collection('maisons').getFullList({
            sort: '-created',
            expand: 'Agent',
            filter: `Agent = "${agent.id}"`
        });
        return { data };
    } catch (error) {
        console.log('Une erreur est survenue en lisant les maisons et les agents', error);
        return null;
    }
}

export async function AllMaisonsSortedAgent() {
    try {
        let data = await db.collection('maisons').getFullList({
            sort: '-created',
            expand: 'Agent'
        });
        return { data };
    } catch (error) {
        console.log('Une erreur est survenue en lisant les maisons et les agents', error);
        return null;
    }
}

export async function bySurfaceAgent(surface, agentId) {
    try {
        let data = await db.collection('maisons').getFullList({
            sort: '-maison_surface',
            expand: 'Agent',
            filter: `maison_surface > ${surface} && Agent = "${agentId}"`
        });
        return { data };
    } catch (error) {
        console.log('Une erreur est survenue en filtrant les maisons par surface et agent', error);
        return null;
    }
}

export async function maisonfavoriagent(favori, agentId) {
    try {
        const fav = favori ? 'true' : 'false';

        const maisons = await db.collection('maisons').getFullList({
            sort: '-created',
            expand: 'Agent',
            filter: `favori = ${fav} && Agent="${agentId}"`,
        });

        return maisons;
    } catch (error) {
        console.log(
            "Une erreur est survenue en filtrant les maisons par favori et agent",
            error
        );
        return null;
    }
}

export async function getOffre(id) {
    try {
        const data = await db.collection('maison').getOne(id);
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la maison', error);
        return null;
    }
}

export async function byPrix(minPrix, maxPrix) {
    try {
        const data = await db.collection("maisons").getFullList({
            sort: "-created",
            filter: `maison_prix >= ${minPrix} && maison_prix <= ${maxPrix}`,
        });
        return data;
    } catch (error) {
        console.log("Erreur filtre prix", error);
        return null;
    }
}
