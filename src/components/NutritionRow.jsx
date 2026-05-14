import Typography from '@mui/material/Typography';

function NutritionRow({ label, value }) {
  if (!value && value !== 0) return null;
  return (
    <Typography variant="body1">
      <strong>{label}:</strong> {value} g
    </Typography>
  );
}

export default NutritionRow;