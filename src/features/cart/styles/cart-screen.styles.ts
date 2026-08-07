import { StyleSheet } from 'react-native';
import { FontFamily, FontSize } from '@shared/constants/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingBottom: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: FontSize.xl,
    letterSpacing: 0,
    fontFamily: FontFamily.bold,
  },
  subtitle: {
    fontSize: FontSize.sm,
    fontFamily: FontFamily.regular,
    marginTop: 4,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 32,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  emptyIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyText: {
    fontSize: FontSize.md,
    fontFamily: FontFamily.medium,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    marginBottom: 16,
    position: 'relative',
  },
  productImage: {
    width: 90,
    height: 90,
    borderRadius: 18,
    backgroundColor: '#EDE9FE',
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 14,
    marginRight: 40,
  },
  productName: {
    fontSize: FontSize.sm,
    fontFamily: FontFamily.bold,
  },
  variantText: {
    fontSize: FontSize.xs,
    fontFamily: FontFamily.regular,
    marginTop: 3,
  },
  priceText: {
    fontSize: FontSize.md,
    fontFamily: FontFamily.black,
    marginTop: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 4,
  },
  quantityPill: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  quantityText: {
    fontSize: FontSize.sm,
    fontFamily: FontFamily.black,
    marginHorizontal: 2,
    minWidth: 20,
    textAlign: 'center',
  },
  summaryCard: {
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 4,
  },
  summaryLabel: {
    fontSize: FontSize.sm,
    fontFamily: FontFamily.regular,
  },
  summaryValue: {
    fontSize: FontSize.sm,
    fontFamily: FontFamily.medium,
  },
  shippingFreeText: {
    fontSize: FontSize.sm,
    fontFamily: FontFamily.semiBold,
  },
  divider: {
    height: 1,
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: FontSize.md,
    fontFamily: FontFamily.black,
  },
  totalValue: {
    fontSize: FontSize.xl,
    fontFamily: FontFamily.black,
  },
});
