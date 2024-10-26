// styles/Theme.ts
export const colors = {
  primary: '#007AFF',
  background: '#F5F5F5',
  text: '#333',
  accent: '#FF9500',
};

export const globalStyles = {
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  } as const,
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 20,
  } as const,
  button: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  } as const,
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  } as const,
  input: {
    width: 200,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    color: colors.text,
  } as const,
};
