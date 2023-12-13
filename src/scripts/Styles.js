const styles = {
  inputFieldStyle: 'w-full flex flex-col p-2 gap-1',
  inputStyle: 'px-2 py-1 w-full rounded-md border-2 border-slate-900/5 bg-slate-400/20',
  labelStyle: 'text-sm text-slate-950/75 font-medium ml-2',
  questionTextStyle:
    'text-center overflow-y-auto font-medium text-xl leading-normal  px-6 pt-6 sm:text-2xl md:text-3xl lg:leading-relaxed max-h-full',
  multipleAnswerBtnStyle:
    'border-2 data-na:hover:bg-green-600/10 bg-slate-900  transition-colors font-medium capitalize data-na:active:bg-slate-50/25 grid place-items-center text-center lg:text-2xl rounded-xl h-10 lg:h-20 lg:w-full data-correct:border-green-500 data-correct:bg-green-800 data-wrong:border-red-500 data-wrong:bg-red-800 data-na:hover:border-green-500 data-correct:animate-ping-once data-wrong:animate-pulse-fast duration-300',
  booleanAnswerBtnStyle:
    'grid h-20 cursor-pointer place-items-center rounded-xl border-2 bg-slate-900 text-center text-lg font-bold capitalize shadow-inner transition-colors data-na:hover:bg-green-600/10 data-na:active:bg-slate-50/40 data-correct:border-green-500 data-correct:bg-green-800 data-wrong:border-red-500 data-wrong:bg-red-800 data-na:hover:border-green-500 sm:text-2xl lg:w-full data-correct:animate-ping-once data-wrong:animate-pulse-fast duration-300',
  ratedStyle: [
    'text-red-800',
    'text-orange-800',
    'text-amber-700',
    'text-yellow-700',
    'text-lime-700',
    'text-green-600',
    'text-emerald-600',
  ],
};

export default styles;
