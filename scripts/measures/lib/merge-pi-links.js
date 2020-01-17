module.exports = (measures, piLinks) => {
  piLinks.forEach((piLink) => {
    console.log(piLink.measureId);
    const measure = measures.find((measure) => {
      if (measure.category === 'pi') {
        console.log(measure.measureId);
      }
      measure.measureId === piLink.measureId
    });
    console.log(measure);
    if (measure) {
      console.log(measure)
      measure.measureSpecification.claims = piLink.link;
    }
  });
};
