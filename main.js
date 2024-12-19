document.addEventListener('DOMContentLoaded', () => {
    const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCj8vr9V1obqJQb0kGCEv78w&part=snippet%2Cid&order=date&maxResults=9';
    const content = document.getElementById('content');
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'a1366f0a43msh0a2134bd0dc6203p12e6afjsn78cecae22859',
            'x-rapidapi-host': 'youtube-v31.p.rapidapi.com'
        }
    };

    async function fetchData(urlApi) {
        const response = await fetch(urlApi, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    }

    (async () => {
        try {
            const videos = await fetchData(API);
            let view = `
            ${(videos.items || []).map(video => `
                <div class="group relative">
                    <div class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                        <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
                    </div>
                    <div class="mt-4 flex justify-between">
                        <h3 class="text-sm text-gray-700">
                            <span aria-hidden="true" class="absolute inset-0"></span>
                            ${video.snippet.title}
                        </h3>
                    </div>
                </div>
            `).slice(0, 4).join('')}
            `;
            content.innerHTML = view;
        } catch (error) {
            console.error(error);
        }
    })();
});
