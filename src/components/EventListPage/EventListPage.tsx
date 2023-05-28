import EventListPageContent from "./EventListPageContent";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { number, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FetchSearchContextProvider from "./FetchSearchContextProvider";


const schema = z.object({
  event_name: z.string(),
  description: z.string(),
  category: z.string(),
  MainCategoryId: z.string(),
  range_date_min: z.coerce.date(), // max>min
  range_date_max: z.coerce.date(),
  range_places_min: z.coerce.number().min(0), //max>min
  range_places_max: z.coerce.number().min(0),
  street: z.string(),
  city: z.string(),
  country: z.string(),
  zip: z.string().max(10),
  username: z.string().max(30),
  nb_places_wanted: z.coerce.number().min(0),
  score_host_min:  z.coerce.number().min(0).max(5),
});

export type FormulaireData = z.infer<typeof schema>;

export function buildRequestObj(formObj: { [key: string]: any }) {
  const requestObj: { [key: string]: any } = {};
  for (const key in formObj) {
    if (!formObj[key]) continue;
    if (key.includes("date")) {
      requestObj[key] = formObj[key].toISOString();
    } else requestObj[key] = formObj[key];
  }
  return requestObj;
}

const EventListPage = () => {
  const methods = useForm<FormulaireData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  return (

      <FormProvider<FormulaireData> {...methods}>
        <EventListPageContent />
      </FormProvider>

  );
};

export default EventListPage;
