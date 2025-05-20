import { StyleSheet } from "react-native";


export	const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
    alignItems:'center'
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
    padding: 10,
  },
  cartIconTopRight: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10,
    padding: 10,
  },
  eventName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#002764',
    textAlign: 'center',
    justifyContent:'center',
    marginBottom: 12,
  },
  eventImage: {
    width: 250,
    height: 250,
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#002764',
    marginTop: 12,
  },
  value: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  cartButton: {
    width: 186,
    height: 86,
    backgroundColor: '#2ECC71',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 30,
    paddingHorizontal: 10,
  },
  cartIcon: {
    marginRight: 8,
  },
  cartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    flexShrink: 1,
  },
});
