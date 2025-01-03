import axios from "axios";

import { environment } from "../../loaders/environment.loader.js";

export const getAccessToken = async (code, workspace) => {
    try {
        const requestBody = {
            grant_type: 'authorization_code',
            code,
            redirect_uri: environment.LINEAR_REDIRECT_URL,
            client_id: environment.LINEAR_CLIENT_ID,
            client_secret: environment.LINEAR_CLIENT_SECRET
        };

        const tokenResponse = await axios.post('https://api.linear.app/oauth/token', requestBody, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });


        const accessToken = tokenResponse.data.access_token;

        workspace.integration.linear.accessToken = accessToken;
        workspace.integration.linear.connected = true;
        await workspace.save();


        return accessToken;
    } catch (error) {
        console.error('Error fetching Linear token:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const getLinearTeams = async (accessToken) => {
    try {
        console.log("AccessToken:", accessToken);
        const response = await axios.post(
            'https://api.linear.app/graphql',
            {
                query: `
                    query {
                        teams {
                            nodes {
                                id
                                name
                                description
                            }
                        }
                    }
                `,
            },
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        // Extract teams from the response
        return response.data.data.teams.nodes;
    } catch (error) {
        console.error('Error fetching Linear teams:', error.response ? error.response.data : error.message);
        throw error;
    }
};


