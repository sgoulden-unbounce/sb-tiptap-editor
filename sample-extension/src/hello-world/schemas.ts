export const typographySchema = {
  fontFamily: {},
  fontWeight: {},
  fontSize: { breakpointSpecific: true },
  lineHeight: { breakpointSpecific: true },
  letterSpacing: { breakpointSpecific: true },
  color: { breakpointSpecific: true },
  textAlign: { layoutSpecific: true },
  textDecoration: { breakpointSpecific: true },
  background: { breakpointSpecific: true },
};

export const marginSchema = {
  marginTop: { breakpointSpecific: true },
  marginBottom: { breakpointSpecific: true },
  marginLeft: { breakpointSpecific: true },
  marginRight: { breakpointSpecific: true },
};

export const paddingSchema = {
  paddingTop: { breakpointSpecific: true },
  paddingBottom: { breakpointSpecific: true },
  paddingLeft: { breakpointSpecific: true },
  paddingRight: { breakpointSpecific: true },
};

export const borderSchema = {
  borderTopLeftRadius: { breakpointSpecific: true, layoutSpecific: true },
  borderTopRightRadius: { breakpointSpecific: true, layoutSpecific: true },
  borderBottomLeftRadius: { breakpointSpecific: true, layoutSpecific: true },
  borderBottomRightRadius: { breakpointSpecific: true, layoutSpecific: true },
};

export const hoverSchema = {
  color: { breakpointSpecific: true },
  background: { breakpointSpecific: true },
  borderStyle: { breakpointSpecific: true },
  borderWidth: { breakpointSpecific: true },
  borderColor: { breakpointSpecific: true },
};

export const activeSchema = {
  color: { breakpointSpecific: true },
  background: { breakpointSpecific: true },
  borderStyle: { breakpointSpecific: true },
  borderWidth: { breakpointSpecific: true },
  borderColor: { breakpointSpecific: true },
};
