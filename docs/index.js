function chunkArray(array, size) {
  if (array.length <= size) {
    return [array]
  }
  return [array.slice(0, size), ...chunkArray(array.slice(size), size)]
}

function openLightbox(event) {
  const lightbox = new FsLightbox();
  const datum = d3.select(event.target).datum();
  // console.log(d3.select(event.target).datum());
  const id = datum.id;
  const pages = datum.pages;

  // set up props, like sources, types, events etc.
  lightbox.props.sources = d3
    .range(1, pages + 1)
    .map((d) => `zine/${d3.format("02d")(id)}/${d3.format("02d")(d)}.jpg`);
  // lightbox.props.onInit = () => console.log("Lightbox initialized!");
  console.log(id, lightbox.props);
  lightbox.open();
}

async function loadData() {
  const data = await d3.tsv("data/zine.tsv", d3.autoType);
  // console.log(data);
  // console.log(chunkArray(data, 4));

  const columns = d3.select("#zine-list")
    .selectAll('div')
    .data(chunkArray(data, 4))
    .join('div')
    .classed("columns", true);

  const column = columns.selectAll("div")
    .data(d => d)
    .join("div")
    .classed("column", true);

  const card = column.append('div')
    .classed("card", true);

  card.append('div')
    .classed('card-image', true)
    .append('figure')
    .classed('image', true)
    .classed('is-square', true)
    .append("img")
    .attr("src", (d) => `images/${d3.format("02d")(d.id)}.jpg`)
    .attr("alt", (d) => d.title)
    .classed('zine-thumbnail', true)
    .on("click", (e) => {
      openLightbox(e);
    })
    .style('cursor', 'pointer');

  const cardContent = card.append('div')
    .classed('card-content', true)
    .append('div')
    .classed('content', true)
  cardContent.append('div')
    .classed('tags', true)
    .append('span')
    .classed('tag', true)
    .classed('is-light', true)
    .classed('is-round', true)
    .text(d => `${d.id} / ${data.length}`)
  cardContent.append("strong").text((d) => d.title);
  cardContent.append("p").text((d) => d.name);
  cardContent.append("small").text((d) => d.description);

  const cardFooter = card.append('footer')
    .classed('card-footer', true)

  const readLink = cardFooter
    .append('a')
    .classed('card-footer-item', true)
    .attr('href', '#')
    .on("click", (e) => {
      openLightbox(e);
    })
  readLink.append('span')
    .attr('class', 'fas fa-book-open')
  readLink.append('span')
    .html('&nbsp;読む')
}

loadData();
