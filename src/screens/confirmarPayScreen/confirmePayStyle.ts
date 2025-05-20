import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#002764',
    marginBottom: 30,
    textAlign: 'center',
  },
  summaryBox: {
    backgroundColor: '#f7f7f7',
    borderRadius: 12,
    padding: 20,
    marginBottom: 40,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    marginTop: 12,
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },
  amount: {
    color: '#00C851',
    marginTop: 8,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 16,
    marginHorizontal: 8,
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: '#ddd',
  },
  backButtonText: {
    color: '#555',
    fontWeight: 'bold',
    fontSize: 16,
  },
  confirmButton: {
    backgroundColor: '#00C851',
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
