interface Props {
  prop: string;
}

const PanelParticipations = ({ prop }: Props) => {
  return (
    <>
      <div>PanelParticipations</div>
      <div>{prop}</div>
    </>
  );
};

export default PanelParticipations;
