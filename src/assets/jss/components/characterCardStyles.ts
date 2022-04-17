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
  status: {
    position: "absolute",
    top: "10px",
    left: "15px",
  },
  iconButton: {
    // backgroundColor: "#00000020",
    backdropFilter: "brightness(0.9)",
    position: "absolute",
    color: "#FFF",
    right: 8,
    top: 8,
  },
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
  cardInfoTitle: {
    textTransform: "uppercase",
    fontWeight: "bold",
    color: "secondary.main",
  },
  cardContent: {
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  chargesSelect: {
    height: "36px",
    fontSize: "0.8rem",
  },
  chargeItem: {
    fontSize: "0.8rem",
  },
  chargeContainer: {
    marginTop: "0.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "1.5rem",
  },
  actionContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "0.5rem",
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
