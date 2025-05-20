import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingHorizontal: 16,
    paddingBottom:10,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 16,
    zIndex: 10,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#002764',
    marginBottom: 16,
    marginTop: 40, // espaço extra por causa do botão
    alignSelf: 'center',
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    marginBottom: 12,
    padding: 12,
    alignItems: 'center',
  },
  itemImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
    marginRight: 12,
    resizeMode: 'cover',
  },
  itemInfo: {
    flex: 1,
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantity: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  price: {
    fontSize: 14,
    color: '#777',
    marginTop: 2,
  },
  footer: {
    marginTop: 12,
    borderTopWidth: 1,
    borderColor: '#ddd',
    paddingTop: 12,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  buyButton: {
    backgroundColor: '#00C851',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
