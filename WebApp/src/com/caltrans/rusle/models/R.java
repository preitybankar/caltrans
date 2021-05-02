package com.caltrans.rusle.models;

public class R {
	private final float rValue;
	private final String location;
	private final int duration;

	public float getrValue() {
		return rValue;
	}

	public String getLocation() {
		return location;
	}

	public int getDuration() {
		return duration;
	}
	
	public R(float rValue, String location, int duration) {
		this.rValue = rValue;
		this.location = location;
		this.duration = duration;
	}

	@Override
	public String toString() {
		return String.format("R value: %s, Location: %s, Duaration: %s,", rValue, location, duration);
	}
}
