axios



.get(
  `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&type=channel&q=${searchQuery}&safeSearch=none&key=AIzaSyAxYTdTGDlgbCAqKpQhTrVlpCN4l3Eyl0I`
)
.then((response) => {
  createChannelRow(response.data["items"][0]);
});
async function createChannelRow(channel) {
    const channelId = channel.id.channelId;
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=AIzaSyAxYTdTGDlgbCAqKpQhTrVlpCN4l3Eyl0I`
    );
    const noOfVideos = response.data.items[0].statistics.videoCount;
    const subs = response.data.items[0].statistics.subscriberCount;
    const snippet = channel.snippet;
    const title = snippet.title;
    const description = snippet.description;
    const image = snippet.thumbnails.medium.url;
    setChannelRow({
      channelId,
      image,
      title,
      subs,
      noOfVideos,
      description,
    });
  }

  <hr />
  {!isLoading ? (
    <ChannelRow
      key={channelRow.channelId}
      image={channelRow.image}
      channel={channelRow.title}
      subs={channelRow.subs}
      noOfVideos={channelRow.noOfVideos}
      description={channelRow.description}
    />
  ) : null} 