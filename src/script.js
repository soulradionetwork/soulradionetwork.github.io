document.addEventListener("DOMContentLoaded", function() {
    const songTitleElement = document.getElementById("song-title");
    const songArtistElement = document.getElementById("song-artist");

    // Fetch metadata from Zeno.fm API using EventSource
    function fetchMetadata() {
        const eventSource = new EventSource('https://api.zeno.fm/mounts/metadata/subscribe/k55vzrom8aptv');
        
        eventSource.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                if (data && data.streamTitle) {
                    const songInfo = data.streamTitle.split(' - '); // Assuming "Artist - Title" format
                    const artist = songInfo[0] || 'Unknown Artist';
                    const title = songInfo[1] || 'Unknown Title';
                    songTitleElement.textContent = title;  // Nama lagu di atas
                    songArtistElement.textContent = artist;  // Nama artis di bawah
                }
            } catch (error) {
                console.error('Error parsing metadata:', error);
            }
        };

        eventSource.onerror = () => {
            console.error('Error connecting to metadata stream');
            songTitleElement.textContent = 'Error fetching data';
            songArtistElement.textContent = 'Please try again later';
        };
    }

    // Initialize metadata fetching
    fetchMetadata();
});
