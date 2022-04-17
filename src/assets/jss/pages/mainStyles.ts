const styles = {
  mainGrid: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    // width: "100%",
    alignItems: "center",
    padding: "1.5rem",
    flex: 1,
  },
  gridContainer: {
    marginTop: 5,
    width: "100%",
  },
  characterGrid: {
    paddingY: "1.5rem",
    marginTop: "1rem",
    display: "grid",
    width: "100%",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    rowGap: "3rem",
    placeItems: "center",
  },
};

export default styles;
