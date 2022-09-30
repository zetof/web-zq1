s.reboot;
(
s.options.numInputBusChannels = 0;
s.options.sampleRate = 16000;
)

MIDIClient.init;
MIDIIn.connect(0);
MIDIdef.freeAll;

(
SynthDef(\ding, {
	arg note=60, vol=0.5, gate=1;
	var sig, env;
	env = EnvGen.ar(Env.asr(releaseTime:1), gate:gate, doneAction:2);
	sig = LFTri.ar(note.midicps);
	Out.ar(0, vol * sig * env);
}).add;
)

(
MIDIdef.noteOn(\play, {
	arg vel, nn, chan, src;
	x = Synth(\ding, [\note, nn]);
});

MIDIdef.noteOff(\gate, {
	arg vel, nn, chan, src;
	x.set(\gate, 0);
});
)