const styles = {
  card: {
    width: "300px",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    position: "relative",
    height: "800px",
  },
  cardMedia: { height: "200px" },

  characterName: {
    display: "flex",
    // alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  characterStatus: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "space-between",
    flexWrap: "wrap",
  },
  cardContent: {
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  modalStyle: {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: 4,
    boxShadow: 24,
    p: 4,
  },
};

export default styles;
